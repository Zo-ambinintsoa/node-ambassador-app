import { Request, Response } from 'express';
import { AppDataSource } from '../../ormconfig';
import { BookFile } from '../entities/bookFile.entity';
import { generateFormattedFileName, getFileSize, getFileType } from '../helpers/file.helper';
import multer from 'multer';
import path from 'path';
import * as fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const formattedFileName = generateFormattedFileName(file.originalname);
        cb(null, formattedFileName);
    },
});

const upload = multer({ storage });

export class FileController {
    private fileRepository = AppDataSource.getRepository(BookFile);

    // Upload a file
    public uploadFile = upload.single('file');

    // Create a file
    public createFile = async (req: Request, res: Response) => {
        try {
            const { mimetype, size } = req.file;

            // Create a new BookFile entity
            const file = new BookFile();
            file.type = getFileType(mimetype);
            file.size = (getFileSize(size)).toString();
            file.url = req.file.filename;

            // Save the file to the database
            const savedFile = await this.fileRepository.save(file);

            res.status(201).json(savedFile);
        } catch (error) {
            console.error('Error creating file:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    // Delete a file
    public deleteFile = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id as string | '0');

            // Find the file by its ID
            const file = await this.fileRepository.findOne({ where: { id } });

            if (!file) {
                return res.status(404).json({ message: 'File not found' });
            }

            // Delete the file from the database
            await this.fileRepository.remove(file);

            // Delete the file from the file system
            const filePath = path.join('uploads/', file.url);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });

            res.json({ message: 'File deleted successfully' });
        } catch (error) {
            console.error('Error deleting file:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}
