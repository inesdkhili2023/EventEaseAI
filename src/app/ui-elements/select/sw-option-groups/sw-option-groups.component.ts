import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

interface Pokemon {
    value: string;
    viewValue: string;
}

interface PokemonGroup {
    disabled?: boolean;
    name: string;
    pokemon: Pokemon[];
}

@Component({
    selector: 'app-sw-option-groups',
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, FeathericonsModule],
    templateUrl: './sw-option-groups.component.html',
    styleUrl: './sw-option-groups.component.scss'
})
export class SwOptionGroupsComponent {

    pokemonControl = new FormControl('');
    pokemonGroups: PokemonGroup[] = [
        {
            name: 'Grass',
            pokemon: [
                {value: 'bulbasaur-0', viewValue: 'Bulbasaur'},
                {value: 'oddish-1', viewValue: 'Oddish'},
                {value: 'bellsprout-2', viewValue: 'Bellsprout'},
            ],
        },
        {
            name: 'Water',
            pokemon: [
                {value: 'squirtle-3', viewValue: 'Squirtle'},
                {value: 'psyduck-4', viewValue: 'Psyduck'},
                {value: 'horsea-5', viewValue: 'Horsea'},
            ],
        },
        {
            name: 'Fire',
            disabled: true,
            pokemon: [
                {value: 'charmander-6', viewValue: 'Charmander'},
                {value: 'vulpix-7', viewValue: 'Vulpix'},
                {value: 'flareon-8', viewValue: 'Flareon'},
            ],
        },
        {
            name: 'Psychic',
            pokemon: [
                {value: 'mew-9', viewValue: 'Mew'},
                {value: 'mewtwo-10', viewValue: 'Mewtwo'},
            ],
        },
    ];

}