import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


export interface User {
    name: string;
}

@Component({
    selector: 'app-test-autocomplete',
    templateUrl: './test-autocomplete.component.html',
    styleUrls: ['./test-autocomplete.component.css']
})
export class TestAutocompleteComponent implements OnInit {

    myControl = new FormControl();
    options: User[] = [
        { name: 'Mary' },
        { name: 'Shelley' },
        { name: 'Cassio' },
        { name: 'Lemos' },
        { name: 'New' },
        { name: 'Igor' }
    ];
    filteredOptions: Observable<User[]>;
    selectedUser: User;

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith<string | User>(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(name => name ? this._filter(name) : this.options.slice())
            );
            //this.myControl.setValue('Cassio')
            this.selectedUser = {
                name: 'Cassio'
            }
    }

    displayFn(user?: User): string | undefined {
        return user ? user.name : undefined;
    }

    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();

        return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
}