declare module "*.css";

declare module '*.scss' {
    const content: { [key: string]: string };
    export default content;
}