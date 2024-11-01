export class BookPreview extends HTMLElement {
    //set up the constructor
    constructor() {
        super();
        //create a shadow DOM for the component, the open status allows external JS to access the shadow DOM via the shadowRoot property
        const shadow = this.attachShadow({ mode: 'open' });

        // Create a style element
        const style = document.createElement('style');
        style.textContent = `
            .preview {
                border-width: 0;
                width: 100%;
                font-family: Roboto, sans-serif;
                padding: 0.5rem 1rem;
                display: flex;
                align-items: center;
                cursor: pointer;
                text-align: left;
                border-radius: 8px;
                border: 1px solid rgba(var(--color-dark), 0.15);
                background: rgba(var(--color-light), 1);
            }

            @media (min-width: 60rem) {
                .preview {
                    padding: 1rem;
                }
            }

            .preview_hidden {
                display: none;
            }

            .preview:hover {
                background: rgba(var(--color-blue), 0.05);
            }

            .preview__image {
                width: 48px;
                height: 70px;
                object-fit: cover;
                background: grey;
                border-radius: 2px;
                box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                            0px 1px 1px 0px rgba(0, 0, 0, 0.1),
                            0px 1px 3px 0px rgba(0, 0, 0, 0.1);
            }

            .preview__info {
                padding: 1rem;
            }

            .preview__title {
                margin: 0 0 0.5rem;
                font-weight: bold;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;  
                overflow: hidden;
                color: rgba(var(--color-dark), 0.8);
            }

            .preview__author {
                color: rgba(var(--color-dark), 0.4);
            }
        `;

        // Append the style to the shadow DOM
        shadow.appendChild(style);

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