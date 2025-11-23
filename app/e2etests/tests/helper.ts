import type { Page } from "@playwright/test";

export const loginWith = async (
    page: Page,
    rut: string,
    password: string
): Promise<void> => {
    await page.fill("#teacher-rut", rut);
    await page.fill("#teacher-password", password);
    await page.getByRole("button", { name: "Entrar" }).click();
};