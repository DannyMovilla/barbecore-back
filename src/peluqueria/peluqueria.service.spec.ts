import { Test, TestingModule } from '@nestjs/testing';
import { PeluqueriaService } from './peluqueria.service';

describe('PeluqueriaService', () => {
  let service: PeluqueriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeluqueriaService],
    }).compile();

    service = module.get<PeluqueriaService>(PeluqueriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
