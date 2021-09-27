import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {SpinnerModule} from '@shared/components/spinner/spinner.module';
import {TableEditorComponent} from './table-editor.component';
import {TableEditorContainer} from './table-editor.container';

@NgModule({
	declarations: [TableEditorComponent, TableEditorContainer],
	imports: [
		CommonModule,
		MatTableModule,
		SpinnerModule,
		MatFormFieldModule,
		MatInputModule,
		MatDialogModule,
		MatButtonModule,
		MatSelectModule,
		ReactiveFormsModule,
	],
	exports: [TableEditorContainer],
})
export class TableEditorModule {}
