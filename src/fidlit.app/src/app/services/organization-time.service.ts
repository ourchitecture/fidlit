import { EventEmitter, Injectable } from '@angular/core';

const SECONDS_IN_YEAR = 31536000;
const SECONDS_IN_DAY = 86400;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

interface OrganizationTime {
  createdOn: Date;
  interval: OrganizationTimeInterval;
  speed: OrganizationTimeSpeed;
  age: OrganizationTimeAge;
}

interface OrganizationTimeInterval {
  durationMs: number;
  createdOn: Date;
  lastUpdatedOn: Date;
}

interface OrganizationTimeSpeed {
  multiplier: number;
}

export interface OrganizationTimeAge {
  total: OrganizationTimeAgeTotal;
  parts: OrganizationTimeAgeParts;
}

interface OrganizationTimeAgeTotal {
  milliseconds: number;
}

interface OrganizationTimeAgeParts {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrganizationTimeService {
  onAgeUpdated = new EventEmitter<OrganizationTimeAge>();
  onSpeedMultiplierUpdated = new EventEmitter<number>();

  onPlay = new EventEmitter<OrganizationTimeAge>();
  onPause = new EventEmitter<OrganizationTimeAge>();
  onReset = new EventEmitter<OrganizationTimeAge>();

  private organizationTime: OrganizationTime = {
    interval: {
      durationMs: 1000,
      createdOn: new Date(),
      lastUpdatedOn: new Date(),
    },
    speed: {
      multiplier: 86400.0, // 1 day = 1 second
    },
    createdOn: new Date(),
    age: {
      total: {
        milliseconds: 0,
      },
      parts: {
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    },
  };

  private intervalId: number = 0;

  public updateSpeedMultiplier(multiplier: number) {
    // console.debug('OrganizationTimeService: updateSpeedMultiplier()');

    this.organizationTime.speed.multiplier = multiplier;

    this.onSpeedMultiplierUpdated.emit(this.organizationTime.speed.multiplier);
  }

  public initialize() {
    // console.debug('OrganizationTimeService: initialize()');

    this.reset();

    // notify that the initial value has been set
    this.onSpeedMultiplierUpdated.emit(this.organizationTime.speed.multiplier);
  }

  public play() {
    // skip if already playing (interval is already set)
    if (this.intervalId !== 0) return;

    // console.debug('OrganizationTimeService: play()');

    // reset dates
    this.organizationTime.interval.createdOn = new Date();
    this.organizationTime.interval.lastUpdatedOn = new Date();

    this.measure();

    this.onPlay.emit(this.organizationTime.age);

    this.intervalId = window.setInterval(
      () => {
        this.measure();
      },
      this.organizationTime.interval.durationMs,
      ...[this]
    );
  }

  public pause() {
    // skip if not playing (interval is not set)
    if (this.intervalId === 0) return;

    window.clearInterval(this.intervalId);

    this.intervalId = 0;

    this.measure();

    this.onPause.emit(this.organizationTime.age);
  }

  public reset() {
    // console.debug('OrganizationTimeService: reset()');

    // make sure time is not running
    this.pause();

    // reset age
    this.organizationTime.createdOn = new Date();
    this.organizationTime.age.total.milliseconds = 0;

    // reset interval
    this.organizationTime.interval.durationMs = 1000;
    this.organizationTime.interval.createdOn = this.organizationTime.createdOn;
    this.organizationTime.interval.lastUpdatedOn =
      this.organizationTime.interval.createdOn;

    // reset measurements
    this.measure();

    this.onReset.emit(this.organizationTime.age);
  }

  private measure() {
    // console.debug('OrganizationTimeService: measure()');

    const currentMeasurementTime = new Date();

    // calculate elapsed time in milliseconds since the last measurement
    const ellapsedMs = Math.abs(
      currentMeasurementTime.getTime() -
        this.organizationTime.interval.lastUpdatedOn.getTime()
    );

    // remember now as the last measurement
    this.organizationTime.interval.lastUpdatedOn = currentMeasurementTime;

    // adjust the time passed by the organizational speed factor
    const adjustedEllapsedMs =
      ellapsedMs * this.organizationTime.speed.multiplier;

    console.debug(
      'age speed multiplier (actual, adjusted)',
      ellapsedMs,
      adjustedEllapsedMs
    );

    // increase the age of the organization by the adjusted time interval
    this.organizationTime.age.total.milliseconds += adjustedEllapsedMs;

    // total elapsed seconds from the organizational age
    const totalSeconds = this.organizationTime.age.total.milliseconds / 1000;

    this.organizationTime.age.parts.years = Math.floor(
      totalSeconds / SECONDS_IN_YEAR
    );

    this.organizationTime.age.parts.days = Math.floor(
      (totalSeconds % SECONDS_IN_YEAR) / SECONDS_IN_DAY
    );

    this.organizationTime.age.parts.hours = Math.floor(
      ((totalSeconds % SECONDS_IN_YEAR) % SECONDS_IN_DAY) / SECONDS_IN_HOUR
    );

    this.organizationTime.age.parts.minutes = Math.floor(
      (((totalSeconds % SECONDS_IN_YEAR) % SECONDS_IN_DAY) % SECONDS_IN_HOUR) /
        SECONDS_IN_MINUTE
    );

    this.organizationTime.age.parts.seconds =
      (((totalSeconds % SECONDS_IN_YEAR) % SECONDS_IN_DAY) % SECONDS_IN_HOUR) %
      SECONDS_IN_MINUTE;

    this.onAgeUpdated.emit(this.organizationTime.age);
  }
}
