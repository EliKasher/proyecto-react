import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  type CourseData,
  type RegisterForm,
  type ProgramContent,
  type DailyPlanification,
  type Staff,
  type Material,
} from "../types/course";

const initialCourseData: CourseData = {
  name: "",
  faculty: "",
  educational_level: [],
  quota: 25,
  course_start: [],
};

const initialProgramContent: ProgramContent = {
  course_purpose: "",
  learning_objectives: [],
};

const initialWeeklyPlanification: DailyPlanification[] = [1, 2, 3, 4, 5].map(
  (dayNumber) => ({
    day: dayNumber,
    first_period: "",
    first_classroom: "",
    second_period: "",
    second_classroom: "",
  })
);

const initialStaff: Staff[] = [];

const initialMaterials: Material[] = [];

const initialState: RegisterForm = {
  course_data: initialCourseData,
  program_content: initialProgramContent,
  weekly_planification: initialWeeklyPlanification,
  staff: initialStaff,
  materials: initialMaterials,
  currentPageNumber: 0,
  currentPageIsValid: false,
  showErrors: false,
};

const slice = createSlice({
  name: "form",
  initialState,
  reducers: {
    resetForm: () => {
      return initialState;
    },

    setCourseData: (state, action: PayloadAction<CourseData>) => {
      state.course_data = action.payload;
    },

    setProgramContent: (state, action: PayloadAction<ProgramContent>) => {
      state.program_content = action.payload;
    },

    setWeeklyPlanification: (
      state,
      action: PayloadAction<DailyPlanification[]>
    ) => {
      state.weekly_planification = action.payload;
    },

    updatePlanForDay: (
      state,
      action: PayloadAction<{ day: number; plan: DailyPlanification }>
    ) => {
      const { day, plan } = action.payload;
      const index = state.weekly_planification.findIndex((p) => p.day === day);
      if (index !== -1) {
        state.weekly_planification[index] = plan;
      }
    },

    setStaff: (state, action: PayloadAction<Staff[]>) => {
      state.staff = action.payload;
    },

    addStaff: (state, action: PayloadAction<Staff>) => {
      state.staff.push(action.payload);
    },

    removeStaff: (state, action: PayloadAction<number>) => {
      // by index
      state.staff = state.staff.filter((_, i) => i !== action.payload);
    },

    updateMaterial: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof Material;
        value: string;
      }>
    ) => {
      state.materials = state.materials.map((m, i) =>
        i === action.payload.index
          ? action.payload.field === "quantity"
            ? { ...m, [action.payload.field]: Number(action.payload.value) }
            : { ...m, [action.payload.field]: action.payload.value }
          : m
      );
    },

    addMaterial: (state, action: PayloadAction<Material>) => {
      state.materials.push(action.payload);
    },

    removeMaterial: (state, action: PayloadAction<number>) => {
      state.materials = state.materials.filter((_, i) => i !== action.payload);
    },

    increasePage: (state) => {
      if (state.currentPageIsValid) {
        state.currentPageNumber =
          state.currentPageNumber === 5 ? 5 : state.currentPageNumber + 1;
        state.showErrors = false;
        state.currentPageIsValid = false;
      } else {
        state.showErrors = true;
      }
    },

    decreasePage: (state) => {
      if (state.currentPageNumber > 0) {
        state.currentPageNumber = state.currentPageNumber - 1;
        state.showErrors = false;
        state.currentPageIsValid = false;
      }
    },

    setPage: (state, action: PayloadAction<number>) => {
      if (0 <= action.payload && action.payload < 5) {
        state.currentPageNumber = action.payload;
      }
    },

    updateIsValid: (state, action: PayloadAction<boolean>) => {
      state.currentPageIsValid = action.payload;

      if (action.payload) {
        state.showErrors = false;
      }
    },

    setShowErrors: (state, action: PayloadAction<boolean>) => {
      state.showErrors = action.payload;
    },
  },
});

export const {
  resetForm,
  setCourseData,
  setProgramContent,
  setWeeklyPlanification,
  updatePlanForDay,
  setStaff,
  addStaff,
  removeStaff,
  updateMaterial,
  addMaterial,
  removeMaterial,
  increasePage,
  decreasePage,
  setPage,
  updateIsValid,
  setShowErrors,
} = slice.actions;

export default slice.reducer;
