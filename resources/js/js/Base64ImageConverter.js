class Base64Image {
    constructor(file, multiple = false) {
        this.file = file;
        this.multiple = multiple;
        this.allowedType = ["jpeg", "jpg", "png", "svg"];
    }

    imageToBase64() {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function (e) {
                resolve(e.target.result);
            };

            reader.onerror = function (error) {
                reject(error);
            };

            reader.readAsDataURL(this.file);
        });
    }

    verifyType(fileName) {
        let extension = fileName.slice(
            ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
        );

        if (this.allowedType.includes(extension)) return extension;
        else return false;
    }

    async getBase64() {
        try {
            let verifyExtension = this.verifyType(this.file.name);

            if (verifyExtension) {
                let image = await this.imageToBase64();

                return {
                    response: true,
                    data: {
                        base64: image,
                        extension: verifyExtension,
                        size: this.formatFileSize(this.file.size)
                    },
                };
            } else
                throw new Error(
                    "File does not meet the rquired type: " +
                        this.allowedType.join(", ")
                );
        } catch (error) {
            return {
                response: false,
                data: error.message,
            };
        }
    }

    formatFileSize(sizeInBytes) {
        const kilobyte = 1024;
        const megabyte = kilobyte * 1024;
        const gigabyte = megabyte * 1024;

        if (sizeInBytes < kilobyte) {
            return sizeInBytes + " B";
        } else if (sizeInBytes < megabyte) {
            return (sizeInBytes / kilobyte).toFixed(2) + " KB";
        } else if (sizeInBytes < gigabyte) {
            return (sizeInBytes / megabyte).toFixed(2) + " MB";
        } else {
            return (sizeInBytes / gigabyte).toFixed(2) + " GB";
        }
    }
}

const Base64ImageConverter = (file, isMultitple = false) => new Base64Image(file, isMultitple);

export default Base64ImageConverter