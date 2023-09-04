export default () => ({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    mongodbUrl: process.env.MONGODB_URI || '',
})

export enum ENV_KEYS {
    port = 'port',
    mongodbUrl = 'mongodbUrl'
}