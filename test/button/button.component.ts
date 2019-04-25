import { Component, EventEmitter, Input, Output } from '@angular/core';

export const abc = 'def';

export type ButtonAppearance = 'primary' | 'secondary';

export function def(){ console.log(); }

export interface ButtonSize {
  one: String;
  two: boolean;
}

/**
 * Short description about the component.
 *
 * Long description about the component...
 *
 * @version 0.0.1
 * @author South Paw <http://southpaw.co.nz>
 * @link Design System <https://atlaskit.atlassian.com/packages/core/button>
 */
@Component({
  selector: 'my-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /** Styling of the button */
  @Input()
  public appearance: 'primary' | 'secondary' = 'secondary';

  /** If the button is disabled */
  @Input()
  public isDisabled = false;

  /**
   * Content within the button
   * 
   * @required
   */
  @Input()
  public label: string;

  /** Size of the button */
  @Input()
  public size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';

  /**
   * Handler to be called when the button is clicked by the user.
   *
   * Will also block the emission of the event if `isDisabled` is true.
   */
  @Output()
  public onClick = new EventEmitter<Event>();

  /**
   *
   *
   * @readonly
   * @type {string}
   * @memberof ButtonComponent
   */
  get classNameGetter(): string {
    return `btn btn-${this.size} ${this.isDisabled ? 'btn-disabled' : ''}`
  }


  /**
   *
   * sets the value of `someSetter`
   * 
   * @memberof ButtonComponent
   */
  set someSetter(newVal: string) {
    console.log(newVal)
  }


  /**
   *
   * Some internal property that is exposed to the parent
   * 
   * @type {string}
   * @memberof ButtonComponent
   */
  public someInternalProperty:string = 'Hello World'

  /**
   *
   * Some internal method that calculates something
   * 
   * @param {string} input Comment about `input`
   * @returns {number}
   * @memberof ButtonComponent
   */
  public calcSomething(input: string, secondParam?: string): number {
    return 42
  }

  public handleClick(event: Event) {
    event.stopPropagation();

    if (!this.isDisabled) {
      this.onClick.emit(event);
    }
  }

  nonPublicMethodWithNoTypedoc(isDisabled:boolean){
    
  }

  protected protectedMethod(id:number){

  }

  private privateMethod(password:string){

  }
}
