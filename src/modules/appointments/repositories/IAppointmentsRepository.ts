// src/modules/appointments/repositories/IAppointmentsRepository.ts
import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindByMonthAndProviderDTO from '../dtos/IFindByMonthAndProviderDTO';
import IFindByDayAndProviderDTO from '../dtos/IFindByDayAndProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByMonthAndProvider(
    data: IFindByMonthAndProviderDTO,
  ): Promise<Appointment[]>;
  findByDayAndProvider(data: IFindByDayAndProviderDTO): Promise<Appointment[]>;
}
