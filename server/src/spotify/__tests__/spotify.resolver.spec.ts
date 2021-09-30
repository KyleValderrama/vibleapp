import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyResolver } from '../spotify.resolverr';

describe('SpotifyResolver', () => {
  let resolver: SpotifyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifyResolver],
    }).compile();

    resolver = module.get<SpotifyResolver>(SpotifyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
