import { NgModule } from '@angular/core';

import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { X, Dash, PlusLg, PlusCircleFill ,Search, ArrowClockwise, PenFill, TrashFill, Plus } from 'ng-bootstrap-icons/icons';

const icons = {
  TrashFill,
  PenFill,
  ArrowClockwise,
  Search,
  PlusCircleFill,
  PlusLg,
  Plus, 
  Dash,
  X
};

@NgModule({
  imports: [
    BootstrapIconsModule.pick(icons)
  ],
  exports: [
    BootstrapIconsModule
  ]
})
export class IconsModule { }