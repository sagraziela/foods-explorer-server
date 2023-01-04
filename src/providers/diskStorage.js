const path = require("path");
const fs = require("fs");
const uploadConfig = require("../configs/upload");

class DiskStorage {
    async save(file) {
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        )

        return file;
    }

    async delete(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        return await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;