import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { CommentListComponent } from './comment-list/comment-list.component';
import { RecordListComponent } from './record-list/record-list.component';
import { RecordListResolver } from './_resolvers/record-list.resolver';
import { CommentListResolver } from './_resolvers/comment-list.resolver';

export const appRoutes: Routes = [

    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        children: [
            { path: 'records', component: RecordListComponent, resolve: {records: RecordListResolver}},
            { path: 'records/:id', component: CommentListComponent, resolve: {comments: CommentListResolver}}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
