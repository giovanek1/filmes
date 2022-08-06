import { BaseService } from './base.service';

export const MOCK_REQUEST_YEARS = {
  "years": [
    {
      "year": 1986,
      "winnerCount": 2
    },
    {
      "year": 1990,
      "winnerCount": 2
    },
    {
      "year": 2015,
      "winnerCount": 2
    }
  ]
};
export const MOCK_REQUEST_WINNER = [
  {
    "id": 197,
    "year": 2018,
    "title": "Holmes & Watson",
    "studios": [
      "Columbia Pictures"
    ],
    "producers": [
      "Adam McKay",
      "Clayton Townsend",
      "Jimmy Miller",
      "Will Ferrell"
    ],
    "winner": true
  }
];
export const MOCK_CONFIG_YEARS = {
  keyOfResponse: 'years',
  listOfFields: ['year', 'winnerCount'],
}
export const MOCK_CONFIG_WINNER = {
  listOfFields: ['id', 'year', 'title'],
}
describe('BaseService', () => {
  let componentInstance: BaseService;
  beforeEach(() => {
    componentInstance = new BaseService();
  });

  it('should: criar o componente', () => {
    expect(componentInstance).toBeTruthy();
  });
  describe('method: mapMultipleValuesByTable', () => {

    it('should: validar se retorna um array de rows quando a prop keyOfResponse é informada', () => {
      const response = componentInstance.mapMultipleValuesByTable(MOCK_REQUEST_YEARS, MOCK_CONFIG_YEARS);
      expect(response).toStrictEqual([
        {
          "values": [
            { "value": 1986 },
            { "value": 2 },
          ],
        },
        {
          "values": [
            { "value": 1990 },
            { "value": 2 },
          ],
        },
        {
          "values": [
            { "value": 2015 },
            { "value": 2 },
          ],
        },
      ]);
    });
    it('should: validar se retorna um array de rows quando a prop keyOfResponse não é informada', () => {
      const response = componentInstance.mapMultipleValuesByTable(MOCK_REQUEST_WINNER, MOCK_CONFIG_WINNER);
      expect(response).toStrictEqual([
        {
          "values": [
            { "value": 197 },
            { "value": 2018 },
            { "value": "Holmes & Watson" },
          ],
        },
      ]);
    });
  });
});
