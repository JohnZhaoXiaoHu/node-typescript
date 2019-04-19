import { Request, Response } from 'express';

export class ItemsActions {
    public getAllItems = (req: Request, res: Response ) => {
        res.send('items list');
    }
    public getItemById = (req: Request, res: Response ) => {
        const id = req.params.id;
        res.send(`item id: ${id}`);
    }
}
