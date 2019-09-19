import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

// Crear instancia del enrutador
const router = Router();

router.get('/heroes', (req: Request, res: Response) => {
  // Ejecutar query
  const query = `SELECT * FROM heroes`;
  MySQL.ejecutarQuery(query, (err: any, heroes: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: true,
        error: err
      });
    }
    else {
      res.json({
        ok: true,
        heroes: heroes
      });
    }
  });
});

router.get('/heroes/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  // Ejecutar query, asegurando que el id esté escapado
  const escapedId = MySQL.instance.con.escape(id);
  const query = `SELECT * FROM heroes WHERE id = ${id}`;
  MySQL.ejecutarQuery(query, (err: any, heroe: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: true,
        error: err
      });
    }
    else {
      res.json({
        ok: true,
        heroe: heroe[0]
      });
    }
  });
});

export default router;
