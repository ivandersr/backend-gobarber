// src/modules/appointments/infra/http/controllers/AppointmentsController.ts
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const { provider_id, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id: user.id,
      date,
    });

    return response.json(appointment);
  }
}
