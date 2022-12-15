import express, {json} from 'express';
import cors from 'cors';
import usersRouter from './routes/users-routes.js';
import authRouter from './routes/auth-routes.js';
import rolesRouter from './routes/roles-routes.js';
import registryRouter from './routes/registry-route.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { dirname,join } from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {credentials:true, origin: process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use('/', express.static(join(__dirname, 'public')))
app.use('/api/auth',authRouter); 
app.use('/api/users', usersRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/registry',registryRouter);


app.listen(PORT, ()=> {
  console.log(`Server is listening on port:${PORT}`);
});

