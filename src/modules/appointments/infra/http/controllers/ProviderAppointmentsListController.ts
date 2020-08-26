// src/modules/appointments/infra/http/controllers/ProviderAppointmentsListController.ts
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsListController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { year, month, day } = request.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointmentsInDay = await listProviderAppointments.execute({
      year: Number(year),
      month: Number(month),
      day: Number(day),
      provider_id,
    });

    return response.json(appointmentsInDay);
  }
}

export default ProviderAppointmentsListController;
