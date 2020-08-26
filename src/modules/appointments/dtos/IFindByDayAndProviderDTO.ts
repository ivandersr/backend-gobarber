// src/modules/appointments/dtos/IFindByDayAndProviderDTO.ts
export default interface IFindByDayAndProviderDTO {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}
