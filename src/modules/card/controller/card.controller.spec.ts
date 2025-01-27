import { Repository } from 'typeorm';
import { UserModule } from '@/modules/user';
import { CardModule } from '../card.module';
import { AuthGuard } from '../../../common/guards';
import { CardController } from './card.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardService } from '../service/card.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CardEntity, UserEntity } from '@/database/entities';
import { LoggerProvider, ProviderModule } from '@/common/providers';
import { CardCreateDto } from '../dto';

describe('CardController', () => {
  let controller: CardController;
  let service: CardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProviderModule, UserModule, CardModule],
      controllers: [CardController],
      providers: [
        LoggerProvider,
        CardService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(CardEntity),
          useClass: Repository,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // Mock AuthGuard
      .compile();

    controller = module.get<CardController>(CardController);
    service = module.get<CardService>(CardService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a card', async () => {
      const cardCreateDto: CardCreateDto = {
        user_id: 2,
        card_number: 100,
      };
      const result = new CardEntity();
      jest.spyOn(service, 'createCard').mockImplementation(async () => result);

      expect(await controller.create({ user: 'test@example.com' } as any, cardCreateDto)).toBe(
        result,
      );
    });
  });
});
