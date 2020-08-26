// src/modules/appointments/infra/http/controllers/ProvidersController.ts
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProviders = container.resolve(ListProvidersService);

    const providers = await showProviders.execute(user_id);

    return response.json(classToClass(providers));
  }
}
