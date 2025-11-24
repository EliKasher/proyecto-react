import { test, expect } from "@playwright/test";
import { loginWith } from "./helper";

test.beforeEach(async ({ page, request }) => {
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
    await loginWith(page, "11111111-1", "Test123.");
    await page.getByRole("button", { name: "Mis Cursos" }).click();
    await expect(page.getByRole("heading", { name: "Mis Cursos" })).toBeVisible();
});

test("teacher can access profile", async ({ page }) => {
    await loginWith(page, "11111111-1", "Test123.");
    await page.getByRole("button", { name: "Mi Perfil" }).click();
    await expect(page.getByRole("heading", { name: "Información Personal" })).toBeVisible();
});

test("teacher can access register course form", async ({ page }) => {
    await loginWith(page, "11111111-1", "Test123.");
    await page.getByRole("button", { name: "Registrar Curso" }).click();
    await expect(page.getByText("Información del Curso")).toBeVisible();
});

test("unauthenticated access shows teacher login screen", async ({ page }) => {
    await page.goto("http://localhost:3001/#/view-courses");
    await expect(page.getByRole("heading", { name: "Ingreso Profesor" })).toBeVisible();

    await page.goto("http://localhost:3001/#/course-form");
    await expect(page.getByRole("heading", { name: "Ingreso Profesor" })).toBeVisible();
});
