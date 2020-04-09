import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
            .subscribe(hero => {
               console.log('Hero to display:', hero);
               this.hero = hero;
            });
  }

  save(): void {
    this.heroService.updateHero(this.hero)
            .subscribe(() => {
              console.log('Updating hero', this.hero);
              this.goBack();
            })
  }

  ngOnInit(): void {
    this.getHero();
  }
  goBack(): void {
    this.location.back();
  }
}
