import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { SelectCustomEvent, RangeCustomEvent } from '@ionic/angular';

import * as generate from 'project-name-generator';

import {
  OrganizationTimeService,
  OrganizationTimeAge,
} from '../services/organization-time.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  companyName = '';
  missionStatement = '';
  visionStatement = '';
  industries: any[] = [];
  selectedIndustry = '';
  industrySelectorOptions = {
    header: 'Industry',
    subHeader: "Select the organization's industry",
  };
  isMissionVisionHelpVisible = false;

  organizationSpeedMultiplier = 0;

  organizationAge: OrganizationTimeAge = {
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
  };

  isOrganizationAgeRunning = false;

  private organizationSuffixes = [
    'LLC',
    'Co.',
    'Corp.',
    'Inc.',
    'Ltd.',
    'P.C.',
    '',
    'Charity',
    'Non-Profit',
    'Foundation',
  ];

  private missionAndVisionStatements = [
    {
      mission:
        'To provide clean and sustainable energy solutions that improve the environment and communities.',
      vision:
        'To create a world where clean energy is accessible and affordable for all.',
    },
    {
      mission:
        'To revolutionize education and make learning accessible, engaging, and effective for all.',
      vision:
        'To be the leader in innovative education technology and shape the future of learning.',
    },
    {
      mission:
        'To provide accessible and affordable healthcare for all individuals and communities.',
      vision:
        'To create a world where healthcare is of the highest quality and accessible for all.',
    },
    {
      mission:
        'To provide sustainable and eco-friendly products and solutions that improve daily life and the environment.',
      vision:
        'To create a world where sustainability is a way of life and the environment is protected for future generations.',
    },
    {
      mission:
        'To provide financial services and education that empower individuals to achieve their financial goals.',
      vision:
        'To create a world where financial stability and prosperity are accessible for all.',
    },
    {
      mission:
        'To provide innovative solutions that make homes smarter, safer, and more comfortable.',
      vision: 'To revolutionize the way we live and interact with our homes.',
    },
    {
      mission:
        'To provide sustainable and eco-friendly transportation solutions that improve mobility and reduce environmental impact.',
      vision:
        'To create a world where mobility is sustainable, accessible, and efficient for all.',
    },
    {
      mission:
        'To provide healthy and natural products that improve well-being and quality of life.',
      vision:
        'To create a world where healthy lifestyles are accessible and achievable for all.',
    },
    {
      mission:
        'To provide innovative and sustainable design solutions that enhance daily life and the environment.',
      vision:
        'To be the leader in innovative and sustainable design and shape the future of the industry.',
    },
    {
      mission:
        'To provide sustainable and environmentally friendly products and solutions that improve daily life and the environment.',
      vision:
        'To create a world where sustainability is a way of life and the environment is protected for future generations.',
    },
    {
      mission:
        'To revolutionize transportation and create a future where mobility is sustainable, accessible, and efficient for all.',
      vision:
        'To shape the future of transportation and create a world where mobility is seamless and sustainable.',
    },
    {
      mission:
        'To provide innovative technology solutions that improve daily life and the world.',
      vision:
        'To be the leader in cutting-edge technology and innovative solutions that enhance daily life.',
    },
    {
      mission:
        'To provide clean and sustainable energy solutions that improve the environment and communities.',
      vision:
        'To create a world where clean energy is accessible and affordable for all.',
    },
    {
      mission:
        'To provide products and services that promote health and well-being for all individuals.',
      vision:
        'To create a world where health and wellness are accessible and achievable for all.',
    },
    {
      mission:
        'To promote sustainable agriculture practices that improve the environment and communities.',
      vision:
        'To create a world where sustainable agriculture is the norm and communities have access to fresh and healthy food.',
    },
    {
      mission:
        'To provide innovative solutions that improve daily life and the world.',
      vision:
        'To be the leader in innovative solutions and shape the future of the industry.',
    },
    {
      mission:
        'To provide sustainable and eco-friendly building solutions that improve the environment and communities.',
      vision:
        'To create a world where sustainable and eco-friendly buildings are the norm and communities have access to healthy and comfortable living spaces.',
    },
    {
      mission:
        'To provide financial services and education that empower individuals to achieve financial freedom and stability.',
      vision:
        'To create a world where financial freedom and stability are accessible for all.',
    },
    {
      mission:
        'To provide sustainable and eco-friendly products that improve daily life and the environment.',
      vision:
        'To create a world where sustainability is a way of life and the environment is protected for future generations.',
    },
    {
      mission:
        'To provide innovative solutions that make cities smarter, safer, and more efficient.',
      vision: 'To revolutionize the way we live and interact with our cities.',
    },
    {
      mission:
        'To provide healthy and natural food products that improve well-being and quality of life.',
      vision:
        'To create a world where healthy and natural foods are accessible and achievable for all.',
    },
    {
      mission:
        'To provide clean and sustainable energy solutions that improve the environment and communities.',
      vision:
        'To create a world where clean energy is the norm and communities have access to sustainable energy solutions.',
    },
    {
      mission:
        'To provide sustainable and eco-friendly transportation solutions that improve mobility and reduce environmental impact.',
      vision:
        'To create a world where sustainable and eco-friendly transportation is the norm and communities have access to efficient and accessible mobility solutions.',
    },
    {
      mission:
        'To provide products and services that promote health and fitness for all individuals.',
      vision:
        'To create a world where health and fitness are accessible and achievable for all.',
    },
    {
      mission:
        'To promote sustainable development practices that improve the environment and communities.',
      vision:
        'To create a world where sustainable development is the norm and communities have access to sustainable and eco-friendly products and solutions.',
    },
    {
      mission:
        'To provide cutting-edge technology solutions that improve daily life and the world.',
      vision:
        'To be at the forefront of technological advancements and shape the future of the industry.',
    },
    {
      mission:
        'To provide sustainable and eco-friendly fashion products that improve the environment and communities.',
      vision:
        'To create a world where sustainable and eco-friendly fashion is the norm and communities have access to stylish and responsible clothing options.',
    },
    {
      mission:
        'To provide education and resources that empower individuals to achieve their full potential.',
      vision:
        'To create a world where education is accessible and individuals have the tools to achieve their goals.',
    },
    {
      mission:
        'To provide products and services that promote a healthy lifestyle for all individuals.',
      vision:
        'To create a world where a healthy lifestyle is accessible and achievable for all.',
    },
    {
      mission:
        'To provide innovative and sustainable energy solutions that improve the environment and communities.',
      vision:
        'To revolutionize the energy industry and create a world where clean energy is the norm.',
    },
    {
      mission:
        'To provide sustainable and eco-friendly beauty products that improve the environment and communities.',
      vision:
        'To create a world where sustainable and eco-friendly beauty is the norm and communities have access to responsible and effective personal care products.',
    },
    {
      mission:
        'To provide financial services and education that empower individuals to take control of their financial future.',
      vision:
        'To create a world where financial empowerment is accessible for all and individuals have the tools to achieve their financial goals.',
    },
    {
      mission:
        'To provide sustainable and eco-friendly transportation solutions that improve mobility and reduce environmental impact.',
      vision:
        'To create a world where sustainable and eco-friendly transportation is the norm and communities have access to efficient and responsible mobility options.',
    },
    {
      mission:
        'To provide innovative healthcare solutions that improve patient outcomes and the healthcare system.',
      vision:
        'To be at the forefront of healthcare advancements and create a world where accessible and effective healthcare is the norm.',
    },
    {
      mission:
        'To provide sustainable and eco-friendly home solutions that improve the environment and communities.',
      vision:
        'To create a world where sustainable and eco-friendly homes are the norm and communities have access to healthy and comfortable living spaces.',
    },
    {
      mission:
        'To provide resources and support that empower women to achieve their full potential.',
      vision:
        'To create a world where women have equal opportunities and access to resources that support their growth and success.',
    },
    {
      mission:
        'To provide products and services that promote healthy aging for all individuals.',
      vision:
        'To create a world where healthy aging is accessible and achievable for all.',
    },
  ];

  constructor(
    private storage: StorageService,
    private http: HttpClient,
    private organizationTimeService: OrganizationTimeService
  ) {}

  async ngOnInit(): Promise<void> {
    this.organizationTimeService.onAgeUpdated.subscribe((age) => {
      // console.debug('HomePage: organizationTimeService.onAgeUpdated()');
      this.organizationAge = age;
    });

    this.organizationTimeService.onSpeedMultiplierUpdated.subscribe(
      (multiplier) => {
        // console.debug(
        //   'HomePage: organizationTimeService.onSpeedMultiplierUpdated()'
        // );
        this.organizationSpeedMultiplier = multiplier;
      }
    );

    this.organizationTimeService.initialize();

    // this.organizationTimeService.play();

    const url = '/api/examples/industries/all.json';

    this.http.get(url).subscribe((response: any) => {
      this.industries.push(...response.industries);

      this.selectedIndustry =
        this.industries[Math.floor(Math.random() * this.industries.length)];
    });

    await this.storage.initialize();

    this.reloadCompanyName();
  }

  playOrganizationTime() {
    // console.debug('HomePage: playOrganizationTime()');
    this.organizationTimeService.play();
    this.isOrganizationAgeRunning = true;
  }

  pauseOrganizationTime() {
    // console.debug('HomePage: pauseOrganizationTime()');
    this.organizationTimeService.pause();
    this.isOrganizationAgeRunning = false;
  }

  resetOrganizationTime() {
    // console.debug('HomePage: resetOrganizationTime()');
    this.organizationTimeService.reset();
    this.isOrganizationAgeRunning = false;
  }

  setOrganizationTimeSpeedMultiplier(ev: Event) {
    // console.debug('HomePage: setOrganizationTimeSpeedMultiplier()');

    const multiplier = (
      ev as RangeCustomEvent
    ).detail.value.valueOf() as number;

    this.organizationTimeService.updateSpeedMultiplier(multiplier);
  }

  setOrganizationTimeSpeedMultiplier2(ev: Event) {
    const multiplier = (ev as SelectCustomEvent).detail.value as number;

    console.debug('setOrganizationTimeSpeedMultiplier2', multiplier);

    this.organizationTimeService.updateSpeedMultiplier(multiplier);
  }

  private getRandomCompanyName(suffix: string): string {
    const companyName = (
      generate()
        .spaced.split(' ')
        .map((word) => word[0].toLocaleUpperCase() + word.substring(1))
        .join(' ') +
      ' ' +
      suffix
    ).trim();

    const lowerCaseCompanyName = companyName.toLocaleLowerCase();

    // Use a trailing ' ' space to ensure short words aren't a partial match.
    const wordsToAvoid = [
      'angry',
      'annoy',
      'annoyed',
      'armed',
      'arrogant',
      'ashamed',
      'auspicious',
      'bad ',
      'belligerent',
      'confused',
      'cumbersome',
      'damaged',
      'damaging',
      'defeated',
      'delirious',
      'demonic',
      'deranged',
      'dirty',
      'disturbed',
      'evasive',
      'fake',
      'false',
      'faulty',
      'fretful',
      'fright',
      'glib',
      'grouchy',
      'grumpy',
      'heartbreaking',
      'horrible',
      'irritating',
      'jaded',
      'jealous',
      'lacking',
      'lame',
      'lousy',
      'moaning',
      'painful',
      'paltry',
      'placid',
      'punishment',
      'raspy',
      'slave',
      'smelly',
      'spurious',
      'stinky',
      'sulky',
      'temper',
      'terrible',
      'thoughtless',
      'truculent',
      'unbecoming',
      'unsuitable',
      'wasteful',
      'worried',
      'wrong',
    ];

    // console.debug('sorted words to avoid', wordsToAvoid.sort().join("',\n'"));

    const companyNameHasWordToAvoid =
      wordsToAvoid.filter(
        (wordToAvoid) => lowerCaseCompanyName.indexOf(wordToAvoid) >= 0
      ).length > 0;

    // get another company name if it contains words to avoid
    if (companyNameHasWordToAvoid) {
      console.warn(
        'Random company name had a word to avoid. Creating a new one...',
        companyName
      );
      return this.getRandomCompanyName(suffix);
    }

    return companyName;
  }

  async reloadCompanyName() {
    const randomSuffix =
      this.organizationSuffixes[
        Math.floor(Math.random() * this.organizationSuffixes.length)
      ];

    this.companyName = this.getRandomCompanyName(randomSuffix);

    await this.storage.set('company-name', this.companyName);

    if (this.industries.length > 0) {
      this.selectedIndustry =
        this.industries[Math.floor(Math.random() * this.industries.length)];
    }

    const missionAndVisionStatement =
      this.missionAndVisionStatements[
        Math.floor(Math.random() * this.missionAndVisionStatements.length)
      ];

    this.missionStatement = missionAndVisionStatement.mission;
    this.visionStatement = missionAndVisionStatement.vision;
  }

  async selectIndustry(value: string) {
    await this.storage.set('industry', value);
  }

  toggleMissionVisionHelpDisplay(isVisible: boolean) {
    this.isMissionVisionHelpVisible = isVisible;
  }
}
