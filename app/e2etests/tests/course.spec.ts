import { test, expect } from "@playwright/test";
import { loginWith } from "./helper";

test.beforeAll(async ({ request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/teachers", {
        data: {
            first_name: "test",
            last_name: "test",
            email: "test@example.com",
            rut: "11111111-1",
            phone: "+56999999999",
            degree: "Test Degree",
            college_relationship: "teacher",
            password: "Test123.",
        },
    });
});

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3001");
});

test("teacher can register a course end-to-end", async ({ page }) => {
    //login
    await loginWith(page, "11111111-1", "Test123.");
    await expect(page.getByText("Bienvenido test")).toBeVisible();

    //abrir register course
    await page.getByRole("button", { name: "Registrar Curso" }).click();
    await expect(page.getByText("Información del Curso")).toBeVisible();

    //curso
    await page.fill('#course-name', 'Curso E2E Test');
    await page.selectOption('#faculty', { label: 'Facultad de Derecho' });
    await page.getByLabel('1°').check();
    await page.fill('#course-quota', '30');
    await page.check('#course-start-date-0');
    await page.getByRole('button', { name: 'Siguiente' }).click();


    //contenido
    const longPurpose = 'Propósito del curso. '.repeat(20);
    await page.fill('#course-purpose', longPurpose);
    await page.getByRole('button', { name: 'Agregar Objetivo' }).click();
    const longObjective = 'Objetivo de aprendizaje detallado. '.repeat(5);
    await page.locator('textarea[name="objective"]').first().fill(longObjective);
    await page.getByRole('button', { name: 'Siguiente' }).click();


    //materiales
    await page.getByRole('button', { name: 'Agregar Material' }).click();
    await page.fill('#material-name-0', 'Material de prueba');
    await page.fill('#material-quantity-0', '2');
    await page.fill('#material-link-0', 'https://example.com/material');

    await page.getByRole('button', { name: 'Siguiente' }).click();

    //planificación semanal
    //llenar los 5 dias
    const longBlock = 'Actividad del bloque. '.repeat(8);
    for (let day = 1; day <= 5; day++) {
        await page.fill(`[name="firstBlockDay${day}"]`, longBlock);
        // use classroom names with at least 3 characters to satisfy validation
        await page.fill(`[name="firstBlockClassroomDay${day}"]`, 'S' + String(day) + '0');
        await page.fill(`[name="secondBlockDay${day}"]`, longBlock);
        await page.fill(`[name="secondBlockClassroomDay${day}"]`, 'S' + String(day + 5) + '0');
    }

    await page.getByRole('button', { name: 'Siguiente' }).click();

    //enviar el formulario
    await page.getByRole('button', { name: 'Enviar' }).click();


    // navegar a Mis Cursos y verificar que el curso creado aparece
    await page.getByRole('button', { name: 'Mis Cursos' }).click();
    await expect(page.getByRole('button', { name: "Curso E2E Test" }).first()).toBeVisible({ timeout: 10000 });
});
