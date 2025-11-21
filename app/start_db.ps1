$dropCommand = @'
db.getSiblingDB("main_db").dropDatabase();
'@

mongosh --eval $dropCommand

$insertDocuments = @'
db = db.getSiblingDB("main_db");
db.documents.insertMany([
  {
    short_name: "cv",
    full_name: "Curriculum Vitae Actualizado"
  },
  {
    short_name: "id_cl",
    full_name: "Cédula de identidad al día"
  },
  {
    short_name: "titulo_prof",
    full_name: "Título profesional"
  },
  {
    short_name: "matricula_pre",
    full_name: "Certificado de alumno regular",
    note: "Matrícula vigente en algún plan de estudio de Pregrado de la Universidad de Chile, acreditado con certificado de Alumno Regular con vigencia en el semestre actual (descargable desde Ucampus)."
  },
  {
    short_name: "form_cc",
    full_name: "Formulario de cuenta corriente",
    note: "Ingresa a https://form-dirbde.uchile.cl/cuenta-corriente una vez ingresados los datos, enviar el respaldo (puede ser un print de pantalla)."
  },
  {
    short_name: "foces",
    full_name: "Formulario FOCES",
    note: "Ingresa a https://foces.uchile.cl/auth/login Una vez completado, descargar el certificado y envíalo."
  }
]);
'@

mongosh --eval $insertDocuments

$insertContractualRelations = @'
db = db.getSiblingDB("main_db");
db.contractual_relationships.insertMany([
  {
    relation: "Personal de Planta",
    requirements: [
      "cv",
      "id_cl"
    ]
  },
  {
    relation: "Personal a Contrata",
    requirements: [
      "cv",
      "id_cl"
    ]
  },
  {
    relation: "Convenio a Honorario",
    requirements: [
      "cv",
      "id_cl",
      "titulo_prof"
    ]
  },
  {
    relation: "Estudiante de Posgrado",
    requirements: [
      "cv",
      "id_cl",
      "titulo_prof"
    ]
  },
  {
    relation: "Estudiante de Pregrado",
    requirements: [
      "matricula_pre",
      "form_cc",
      "foces"
    ]
  },
  {
    relation: "Sin Vinculo laboral con la UCH",
    requirements: [
      "cv",
      "id_cl"
    ]
  }
]); 
'@

mongosh --eval $insertContractualRelations

$insertFaculties = @'
db = db.getSiblingDB("main_db");
db.faculties.insertMany([
  {
    "name": "Facultad de Ciencias Físicas y Matemáticas"
  },
  {
    "name": "Facultad de Medicina"
  },
  {
    "name": "Facultad de Economía y Negocios"
  },
  {
    "name": "Facultad de Derecho"
  },
  {
    "name": "Facultad de Ciencias Químicas y Farmacéuticas"
  },
  {
    "name": "Facultad de Odontología"
  },
  {
    "name": "Facultad de Gobierno"
  },
  {
    "name": "Facultad de Ciencias Sociales"
  },
  {
    "name": "Facultad de Filosofía y Humanidades"
  },
  {
    "name": "Facultad de Ciencias Veterinarias y Pecuarias"
  },
  {
    "name": "Facultad de Ciencias Forestales y de la Conservación de la Naturaleza"
  }
])
'@

mongosh --eval $insertFaculties

$insertLevels = @'
db = db.getSiblingDB("main_db");
db.educational_levels.insertMany([
  { "level": "1" },
  { "level": "2" },
  { "level": "3" },
  { "level": "4" },
  { "level": "5" },
  { "level": "6" },
  { "level": "7" },
  { "level": "8" },
  { "level": "I" },
  { "level": "II" },
  { "level": "III" },
  { "level": "IV" }
]);
'@

mongosh --eval $insertLevels

$insertDates = @'
db = db.getSiblingDB("main_db");
db.course_dates.insertMany([
  {
    "start_date": "5",
    "end_date": "9",
    "start_month": "enero",
    "end_month": "enero"
  },
  {
    "start_date": "12",
    "end_date": "16",
    "start_month": "enero",
    "end_month": "enero"
  },
  {
    "start_date": "19",
    "end_date": "23",
    "start_month": "enero",
    "end_month": "enero"
  }
]);
'@

mongosh --eval $insertDates 

$insertCourses = @'
db = db.getSiblingDB("main_db");
db.courses.insertMany([
  {
    "course_data": {
      "name": "test",
      "faculty": "Facultad de Filosofía y Humanidades",
      "educational_level": ["1", "2", "3", "4"],
      "quota": 29,
      "course_start": [
        {
          "start_date": "5",
          "end_date": "9",
          "start_month": "enero",
          "end_month": "enero"
        },
        {
          "start_date": "12",
          "end_date": "16",
          "start_month": "enero",
          "end_month": "enero"
        },
        {
          "start_date": "19",
          "end_date": "23",
          "start_month": "enero",
          "end_month": "enero"
        }
      ]
    },
    "program_content": {
      "course_purpose": "cosas",
      "learning_objectives": ["algo bueno"]
    },
    "weekly_planification": [
      {
        "day": 1,
        "first_period": "dia 11",
        "first_classroom": "11",
        "second_period": "dia 12",
        "second_classroom": "12"
      },
      {
        "day": 2,
        "first_period": "dia 21",
        "first_classroom": "21",
        "second_period": "dia 22",
        "second_classroom": "22"
      },
      {
        "day": 3,
        "first_period": "dia 31",
        "first_classroom": "31",
        "second_period": "dia 32",
        "second_classroom": "32"
      },
      {
        "day": 4,
        "first_period": "dia 41",
        "first_classroom": "41",
        "second_period": "dia 42",
        "second_classroom": "42"
      },
      {
        "day": 5,
        "first_period": "dia 51",
        "first_classroom": "51",
        "second_period": "dia 52",
        "second_classroom": "52"
      }
    ],
    "teachers_data": {
      "first_name": "a",
      "last_name": "b",
      "rut": "12345678-9",
      "email": "test@email.cl",
      "phone": "+56912345678",
      "degree": "Un crack",
      "college_relationship": "Sin Vinculo laboral con la UCH"
    },
    "staff": [
      {
        "first_name": "Alguien",
        "last_name": "nose",
        "rut": "12345678-9",
        "email": "b@email.cl",
        "phone": "+56987654321",
        "position": ""
      }
    ],
    "materials": [
      {
        "name": "Material 1",
        "quantity": 1,
        "link": "rickroll"
      }
    ]
  },
  {
    "course_data": {
      "name": "Curso 1",
      "faculty": "Facultad de Derecho",
      "educational_level": [
        "1", "2", "3", "4", "5", "6", "7", "8", "I", "II", "III", "IV"
      ],
      "quota": 30,
      "course_start": [
        {
          "start_date": "5",
          "end_date": "9",
          "start_month": "enero",
          "end_month": "enero"
        },
        {
          "start_date": "12",
          "end_date": "16",
          "start_month": "enero",
          "end_month": "enero"
        },
        {
          "start_date": "19",
          "end_date": "23",
          "start_month": "enero",
          "end_month": "enero"
        }
      ]
    },
    "program_content": {
      "course_purpose": "Aprenderemos algo",
      "learning_objectives": ["Objetivo 1"]
    },
    "weekly_planification": [
      {
        "day": 1,
        "first_period": "Dia 11",
        "first_classroom": "1",
        "second_period": "Dia 12",
        "second_classroom": "2"
      },
      {
        "day": 2,
        "first_period": "Dia 21",
        "first_classroom": "3",
        "second_period": "Dia 22",
        "second_classroom": "4"
      },
      {
        "day": 3,
        "first_period": "Dia 31",
        "first_classroom": "5",
        "second_period": "Dia 32",
        "second_classroom": "6"
      },
      {
        "day": 4,
        "first_period": "Dia 41",
        "first_classroom": "7",
        "second_period": "Dia 42",
        "second_classroom": "8"
      },
      {
        "day": 5,
        "first_period": "Dia 51",
        "first_classroom": "9",
        "second_period": "Dia 52",
        "second_classroom": "10"
      }
    ],
    "teachers_data": {
      "first_name": "Nombre1 Nombre2",
      "last_name": "Apellido1 Apellido2",
      "rut": "12345678-9",
      "email": "correo1@email.com",
      "phone": "+56912345678",
      "degree": "Cuarto medio",
      "college_relationship": "Personal de Planta"
    },
    "staff": [
      {
        "first_name": "Nombre12 Nombre22",
        "last_name": "Apellido12 Apellido 22",
        "rut": "98765432-1",
        "email": "correo2@email.com",
        "phone": "_5698765421",
        "position": ""
      }
    ],
    "materials": [
      {
        "name": "Material 1",
        "quantity": 5,
        "link": "Link1"
      }
    ]
  }
]);
'@

mongosh --eval $insertCourses