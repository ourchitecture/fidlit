import { TestBed } from '@angular/core/testing';

import { TimerService } from './timer.service';

export function getTimerServiceSpy(methods: string[] | undefined = undefined) {
  const mockedMethods = methods || ['start', 'stop'];

  const spy: jasmine.SpyObj<TimerService> = jasmine.createSpyObj(
    'TimerService',
    mockedMethods
  );

  return spy;
}

export function getTimerServiceStub(methods: string[] | undefined = undefined) {
  const spy = getTimerServiceSpy(methods);

  spy.start.and.resolveTo({
    options: {
      durationInMs: 0,
      repeat: true,
    },
    id: 0,
  });

  return spy;
}

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
