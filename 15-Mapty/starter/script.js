'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

    class Workout{
        id = (Date.now() + '').slice(-10);
        date = new Date();
        // prettier-ignore
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        constructor(distance,duration,coords){
            this.distance = distance;
            this.duration = duration;
            this.coords = coords;
        }
        _setDescription(){
            this.description = this.type === 'running' ? "Running" : "Cycling";
            this.description += ` on ${this.months[this.date.getMonth()]}`
        }
    }
    class Running extends Workout{
        type = 'running';
        constructor(distance,duration,coords,cadence){
            super(distance,duration,coords);
            this.cadence = cadence;
            this._calcPace();
            this._setDescription();
        }
        _calcPace(){
            this.pace = this.duration / this.distance;
        }
    }
    class Cycling extends Workout{
        type = 'cycling';
        constructor(distance,duration,coords,elevation){
            super(distance,duration,coords);
            this.elevation = elevation;
            this._calcSpeed();
            this._setDescription();
        }
        _calcSpeed(){
            this.speed = this.distance / (this.duration / 60);
        }
    }

    class App{
        #map;
        #mapEvent;
        #workouts = [];
        constructor(){
            this._getCurrentPosition();
            form.addEventListener('submit',this._newWorkOut.bind(this))
            inputType.addEventListener('change',this._toggleElevationField.bind(this))
            containerWorkouts.addEventListener('click',this._movetoMarker.bind(this))
            this._getDateFromLocalStorage();
        }
        _getCurrentPosition(){
            navigator.geolocation &&
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function(){
                alert('Could not get your current position');
            })
        }
        _loadMap(position){
            const {latitude} = position.coords;
                const {longitude} = position.coords;
                const coords = [latitude,longitude];
                this.#map = L.map('map').setView(coords, 13);
                L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(this.#map);
                this.#map.on('click',this._showForm.bind(this))
                this.#workouts.forEach((workout) => {
                    this._renderWorkOutMap(workout)
                });
        }
        _showForm(event){
            this.#mapEvent = event;
            form.classList.remove('hidden');
            inputDistance.focus();
        }
        _toggleElevationField(e){
            e.preventDefault();
            inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
            inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        }
        _newWorkOut(e){
            e.preventDefault();
            const validData = (...inputs) => inputs.every(ins => !Number.isFinite(ins));
            const isPostive = (...inputs) => inputs.every(ins => ins > 0); 
            // get data from form
            const type = inputType.value;
            const duration = inputDuration.value;
            const distance = inputDistance.value;
            let workout;
            const {lat} = this.#mapEvent.latlng;
            const {lng} = this.#mapEvent.latlng;
            // check data is valid
            // create objects based on type
            if(type === 'running'){
                const cadence = inputCadence.value;
                if(!validData(duration,distance,cadence) || !isPostive(duration,distance,cadence)) return alert('Inputs should be valid')
                workout = new Running(distance,duration,[lat,lng],cadence);
                console.log(workout);
            }
            if(type === 'cycling'){
                const elevation = inputElevation.value;
                if(!validData(duration,distance,elevation) || !isPostive(duration,distance)) return alert('Inputs should be valid')
                workout = new Cycling(distance,duration,[lat,lng],elevation);
                console.log(workout);
            }
            // add object to workout array
            this.#workouts.push(workout);
            // render workout on map
            this._renderWorkOutMap(workout);
            // render workout on list
            this._renderWorkOutOnList(workout);
            // hide form and clear input fields
            this._hideForm();
            // set workout array in local storage
            this._setLocalStorage();
        }
        _renderWorkOutMap(workout){
            L.marker(workout.coords)
        .addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth : 250,
            minWidth : 100,
            autoClose : false,
            closeOnClick : false,
            className : `${workout.type}-popup`
        }))
        .setPopupContent( `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
        .openPopup()
        }
        _renderWorkOutOnList(workout){
            let html = `<li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
              <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
              <span class="workout__value">${workout.distance}</span>
              <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⏱</span>
              <span class="workout__value">${workout.duration}</span>
              <span class="workout__unit">min</span>
            </div>`

            if(workout.type === 'running')
               html += ` <div class="workout__details">
               <span class="workout__icon">⚡️</span>
               <span class="workout__value">${workout.pace.toFixed()}</span>
               <span class="workout__unit">min/km</span>
             </div>
             <div class="workout__details">
               <span class="workout__icon">🦶🏼</span>
               <span class="workout__value">${workout.cadence}</span>
               <span class="workout__unit">spm</span>
             </div>
           </li>` 

           if(workout.type === 'cycling')
               html += ` <div class="workout__details">
               <span class="workout__icon">⚡️</span>
               <span class="workout__value">${workout.speed.toFixed()}</span>
               <span class="workout__unit">min/km</span>
             </div>
             <div class="workout__details">
               <span class="workout__icon">🦶🏼</span>
               <span class="workout__value">${workout.elevation}</span>
               <span class="workout__unit">spm</span>
             </div>
           </li>` 

           form.insertAdjacentHTML('afterend',html);
        }
        _hideForm(){
            inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';
            form.style.display = 'none';
            form.classList.add('hidden');
            setTimeout(() => (form.style.display = 'grid'), 1000);
        }
        _movetoMarker(e){
            const workoutElement = e.target.closest('.workout');
            if(!workoutElement) return;
            const workout = this.#workouts.find(work => work.id === workoutElement.dataset.id)
            this.#map.setView(workout.coords,13,{
                animation : true,
                pan : {
                    duration : 1
                }
            })
        }
        _setLocalStorage(){
            localStorage.setItem('workouts',JSON.stringify(this.#workouts));
        }
        _getDateFromLocalStorage(){
            const data = JSON.parse(localStorage.getItem('workouts'));
            if(!data) return;
            this.#workouts = data;
            this.#workouts.forEach((workout) => {
                this._renderWorkOutOnList(workout)
            });
        }
    }

    const app = new App();


