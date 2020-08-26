// src/modules/appointments/dtos/ICreateAppointmentDTO.ts
export default interface ICreateAppointmentDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}
