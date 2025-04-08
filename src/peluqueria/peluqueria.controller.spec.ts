import { Test, TestingModule } from '@nestjs/testing';
import { PeluqueriaController } from './peluqueria.controller';
import { PeluqueriaService } from './peluqueria.service';

describe('PeluqueriaController', () => {
  let controller: PeluqueriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeluqueriaController],
      providers: [PeluqueriaService],
    }).compile();

    controller = module.get<PeluqueriaController>(PeluqueriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
