/*eslint-disable*/
import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

describe('CardsController', () => {
  let controller: CardsController;
  let service: CardsService;

  beforeEach(async () => {
    const mockCardsService = {
      findAllCards: jest.fn(() => [
        { id: 1, cardNumber: '1234567890123456', balance: 100 },
      ]),
      findOneCard: jest.fn().mockImplementation((id: number) => ({
        id,
        cardNumber: '1234567890123456',
        balance: 100,
      })),

      getTransactions: jest.fn().mockImplementation((cardId: number) =>
        Promise.resolve([
          {
            id: 1,
            cardId: cardId,
            type: 'deposit',
            amount: 100,
            timestamp: new Date(),
          },
          {
            id: 2,
            cardId: cardId,
            type: 'withdrawal',
            amount: 50,
            timestamp: new Date(),
          },
        ]),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useValue: mockCardsService,
        },
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllCards', () => {
    it('should return an array of cards', async () => {
      expect(await controller.getAllCards()).toEqual([
        { id: 1, cardNumber: '1234567890123456', balance: 100 },
      ]);
      expect(service.findAllCards).toHaveBeenCalled();
    });
  });

  describe('findOneCard', () => {
    it('should return a single card object', async () => {
      const cardId = 1;
      expect(await controller.findOneCard(cardId)).toEqual({
        id: cardId,
        cardNumber: '1234567890123456',
        balance: 100,
      });
      expect(service.findOneCard).toHaveBeenCalledWith(cardId);
    });
  });

  describe('getTransactions', () => {
    it('should return an array of transactions for the specified card', async () => {
      const cardId = 1;
      const transactions = await controller.getTransactions(cardId);

      expect(transactions).toEqual([
        {
          id: 1,
          cardId: cardId,
          type: 'deposit',
          amount: 100,
          timestamp: expect.any(Date),
        },
        {
          id: 2,
          cardId: cardId,
          type: 'withdrawal',
          amount: 50,
          timestamp: expect.any(Date),
        },
      ]);
      expect(service.getTransactions).toHaveBeenCalledWith(cardId);
    });
  });
});
