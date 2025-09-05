declare module "*.png" {
    const value: number; // React Native bundler returns a numeric ID
    export default value;
}
declare module "*.jpg" {
    const value: number;
    export default value;
}
declare module "*.jpeg" {
    const value: number;
    export default value;
}
