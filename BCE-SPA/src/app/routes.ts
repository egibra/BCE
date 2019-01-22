import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { RecordListComponent } from './record-list/record-list.component';
import { RecordListResolver } from 'src/app/_resolvers/record-list.resolver';

export const appRoutes: Routes = [

    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        children: [
            { path: 'records', component: RecordListComponent, resolve: {records: RecordListResolver}},
            { path: 'records/:id', component: CommentListComponent}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
