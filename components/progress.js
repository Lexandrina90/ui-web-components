class Progress extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const progress = document.createElement('div');
    progress.classList.add('progress');
  
    const bar = document.createElement('div');
    bar.classList.add('bar');
    progress.appendChild(bar);

    const barPr = document.createElement('span');
    barPr.classList.add('barPr');
    bar.appendChild(barPr);


    const label = document.createElement('div');
    label.classList.add('label');
    label.textContent = '40% ';

    const barSlot = document.createElement('slot');
    barSlot.name = `bar-label`;
    label.appendChild(barSlot);


    progress.appendChild(label);

    const btnBar = document.createElement('div');
    btnBar.classList.add('btnBar');

    const btnMinus = document.createElement('div');
    btnMinus.classList.add('btnMinus');
    btnBar.appendChild(btnMinus);


    const btnPlus = document.createElement('div');
    btnPlus.classList.add('btnPlus');
    btnBar.appendChild(btnPlus);

    btnMinus.onclick = () => {
      const currentValue = parseFloat(label.textContent); 
      const newValue = currentValue - 10; 
      label.textContent = ''; 
    
      const barLabel = document.createElement('span');
      barLabel.slot = 'bar-label';
      barLabel.textContent = newValue + '% '
    
      const additionalLabel = document.createElement('span');
      additionalLabel.slot = 'additional-label';
      additionalLabel.textContent = 'Founded';
    
      label.appendChild(barLabel); 
      label.appendChild(additionalLabel); 

      const barPr = shadow.querySelector('.barPr'); // Найти элемент с классом barPr
      barPr.style.width = `${newValue}%`; 
    };

    btnPlus.onclick = () => {
      const currentValue = parseFloat(label.textContent); 
      const newValue = currentValue + 10; 
      label.textContent = ''; 
    
      const barLabel = document.createElement('span');
      barLabel.slot = 'bar-label';
      barLabel.textContent = newValue + '% '
    
      const additionalLabel = document.createElement('span');
      additionalLabel.slot = 'additional-label';
      additionalLabel.textContent = 'Founded';
    
      label.appendChild(barLabel); 
      label.appendChild(additionalLabel); 

      const barPr = shadow.querySelector('.barPr'); 
      barPr.style.width = `${newValue}%`; 
    };
    
    // btnMinus.onclick = () => {
    //   const currentValue = parseFloat(label.textContent);
    //   const newValue = currentValue - 10; 
    //   label.textContent = `${newValue}%`
    // }

    const styles = `
      .progress {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .bar {
        width: 100%;
        height: 20px;
        background: var(--slider-check-color);
        padding: 0;
        border-radius: 4px;
        position: relative;
      }
      .barPr {
        // content: '';
        position: absolute;
        height: 20px;
        width: 40%;
        background: var(--breadcrumb-color);
        border-radius: 4px;
      }
      .label {
        margin-top: 16px;
      }
      .btnBar {
        display: flex;
        margin-top: 10px;
        cursor: pointer;
      }

      .btnMinus {
        width: 10px;
        height: 10px;
        color: red;
        padding: 6px;
        border: 1px solid var(--minus-bg);
        border-radius: 4px 0px 0px 4px;
        border-right: none;
        background: var(--minus-bg);
        position: relative;
      }
      .btnMinus::before {
        background: var(--message-header);
        position: absolute;
        content: '';
        width: 10px;
        height: 2px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .btnPlus {
        width: 10px;
        height: 10px;
        color: green;
        padding: 6px;
        border: 1px solid var(--plus-bg);
        border-radius: 0px 4px 4px 0px;
        background: var(--plus-bg);
        position: relative;
      }
      .btnPlus::before {
        background: var(--sidebar-before);
        position: absolute;
        content: '';
        width: 10px;
        height: 2px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .btnPlus::after {
        position: absolute;
        content: '';
        width: 2px;
        height: 10px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--sidebar-before);
      }
    `;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(style);
    shadow.appendChild(progress);
    shadow.appendChild(btnBar);
  }
}
customElements.define('custom-progress', Progress);