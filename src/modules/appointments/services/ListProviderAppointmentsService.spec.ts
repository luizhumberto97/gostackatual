import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  // it é igual o teste() e significa isso ou isto em inglês
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 11, 25, 14, 0, 0), // January = 0  -> Year, Month, Day, Hours, minutes, seconds
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 11, 25, 15, 0, 0), // January = 0  -> Year, Month, Day, Hours, minutes, seconds
    });

    // No Service, é bom passar o numero do mẽs correto
    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 12, // aqui tá maio
      day: 25,
    });

    // espero que seja um array
    // 20 e 21 estejam availability = false
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
