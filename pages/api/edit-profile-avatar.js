import fs from 'fs';
import path from 'path';
import { withIronSessionApiRoute } from "iron-session/next";
import formidable from 'formidable';

export default withIronSessionApiRoute(
    async function handler(req, res) {
        if (req.method !== 'POST') {
            res.status(405).json({ message: 'Method Not Allowed' });
            return;
        }

        const user_id = req?.session?.user?.id;

        // Check if the user_id is provided
        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        // Get the file from the request body
        var form = formidable({
            maxFiles: 1,
            uploadDir: path.join(process.cwd(), 'avatars'),
        });
        console.log("formiddable started");
        let files;
        let fields;
        try {
            [fields, files] = await form.parse(req);
        } catch (error) {
            console.log(error);
        }
        console.log('FILES  ', files, fields);
        fs.rename(files.avatar[0].filepath, path.join(process.cwd(), 'avatars', `${String(user_id)}.png`), function (err) {
            if (err) {
                res.status(400).json({ message: `Error uploading file: ${err}` });
                res.end();
            } else {
                res.status(200).json({ message: 'Avatar uploaded successfully' });
                res.end();
            }
        });
    },
    {
        cookieName: process.env.IRON_SESSION_COOKIE_NAME,
        password: process.env.COOKIE_ENCRYTPION_PASSWORD,
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        }
    }
);

export const config = {
    api: {
        bodyParser: false,
    },
};
