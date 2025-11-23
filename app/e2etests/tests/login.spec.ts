import { test, expect } from "@playwright/test";
import { loginWith } from "./helper";

test.beforeEach(async ({ page, request }) => {
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

    await page.goto("http://localhost:3001");
});
test("teacher can log in", async ({ page }) => {
    await loginWith(page, "11111111-1", "Test123.");
    await expect(page.getByText("Bienvenido test")).toBeVisible();

});
test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "11111111-1", "estanoeslacontrasena");
    await expect(page.getByText("invalid rut or password")).toBeVisible();
});
test("teacher can access courses list", async ({ page }) => {
    await loginWith(page, "11111111-1", "estanoeslacontraseña");
    await page.goto("http://localhost:3001/#/view-courses");
    await expect(page.getByText("Lista de Cursos")).toBeVisible();
});

test("teacher can access course form", async ({ page }) => {
    await loginWith(page, "11111111-1", "Test123.");
    await page.goto("http://localhost:3001/#/course-form");
    await expect(page.getByText("Información del Curso")).toBeVisible();
});

test("unauthenticated access shows teacher login screen", async ({ page }) => {
    await page.goto("http://localhost:3001/#/view-courses");
    await expect(page.getByRole("heading", { name: "Ingreso Profesor" })).toBeVisible();

    await page.goto("http://localhost:3001/#/course-form");
    await expect(page.getByRole("heading", { name: "Ingreso Profesor" })).toBeVisible();
});
