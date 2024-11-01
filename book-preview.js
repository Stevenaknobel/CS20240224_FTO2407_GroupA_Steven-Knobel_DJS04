class BookPreview extends HTMLElement {
    //set up the constructor
    constructor() {
        super();
        //create a shadow DOM for the component, the open status allows external JS to access the shadow DOM via the shadowRoot property
        const shadow = this.attachShadow({ mode: 'open' });

        // Create the elements
        const button = document.createElement('button');
        button.classList.add('preview');

        const img = document.createElement('img');
        img.classList.add('preview__image');

        const info = document.createElement('div');
        info.classList.add('preview__info');

        const title = document.createElement('h3');
        title.classList.add('preview__title');

        const author = document.createElement('div');
        author.classList.add('preview__author');

        // Append elements
        //title and author added to the info div
        info.appendChild(title);
        info.appendChild(author);
        //image and info added to the button
        button.appendChild(img);
        button.appendChild(info);
        //button added to the shadow DOM
        shadow.appendChild(button);

        // Add event listener for click event
        button.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('book-preview-click', {
                detail: { id: this.getAttribute('data-id') },
                bubbles: true
            }));
        });
    }
//when one of these changes the attributechangedcallback method will trigger to pull new info
    static get observedAttributes() {
        return ['data-id', 'image', 'title', 'author'];
    }
//called whenever data-id, image, title or author changes
    attributeChangedCallback(name, oldValue, newValue) {
        const shadow = this.shadowRoot;
        if (name === 'data-id') {
            this.setAttribute('data-id', newValue);
        } else if (name === 'image') {
            shadow.querySelector('.preview__image').src = newValue;
        } else if (name === 'title') {
            shadow.querySelector('.preview__title').innerText = newValue;
        } else if (name === 'author') {
            shadow.querySelector('.preview__author').innerText = newValue;
        }
    }
}
//defines the custom element
customElements.define('book-preview', BookPreview);