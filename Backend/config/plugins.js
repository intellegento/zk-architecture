module.exports = ({env}) => ({
    upload: {
        config: {
            provider: 'aws-s3',
            providerOptions: {
                rootPath: env('YANDEX_ROOT_PATH'),
                s3Options: {
                    credentials: {
                        accessKeyId: env('YANDEX_ACCESS_KEY_ID'),
                        secretAccessKey: env('YANDEX_ACCESS_SECRET'),
                    },
                    endpoint: env('YANDEX_ENDPOINT'),
                    region: env('YANDEX_REGION'),
                    params: {
                        Bucket: env('YANDEX_BUCKET'),
                    },
                },
            },
            actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
            },
            sizeLimit: 250 * 1024 * 1024,
        },
    },
});
