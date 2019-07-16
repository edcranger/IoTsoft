<template>
  <div class="panel">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 class="pa-2">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn fab color="cyan" dark v-on="on">
                <v-icon dark>edit</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline green" dark primary-title>Add Component</v-card-title>

              <v-card-text>
                <v-stepper v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" color="green" step="1">Name</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="e1 > 2" color="green" step="2">Auth</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3" color="green" dark>Pin</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="4" color="green" dark>Summary</v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <v-flex xs12 md4 class="mx-auto my-5">
                        <v-text-field
                          v-model="dataInsert.name"
                          :rules="nameRules"
                          :counter="15"
                          label="Name"
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-btn color="green" @click="e1 = 2" dark>Continue</v-btn>

                      <v-btn flat>Cancel</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <v-flex xs12 md4 class="mx-auto my-5">
                        <v-text-field
                          v-model="dataInsert.auth"
                          :rules="nameRules"
                          :counter="40"
                          label="Auth"
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-btn color="green" @click="e1 = 3" dark>Continue</v-btn>

                      <v-btn flat>Cancel</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                      <v-flex xs12 md4 class="mx-auto my-5">
                        <v-text-field
                          v-model="dataInsert.pin"
                          :rules="nameRules"
                          :counter="40"
                          label="Pin"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-btn color="green" @click="e1 = 4" dark>Create Button</v-btn>

                      <v-btn flat @click="e1 = 1">Cancel</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                      <v-card class="pa-2">
                        <p class="subheading">Summary</p>
                        <p>Name:{{dataInsert.name}}</p>
                        <p>Auth:{{dataInsert.auth}}</p>
                        <p>Pin:{{dataInsert.pin}}</p>
                      </v-card>
                      <v-btn
                        v-if="dataInsert.auth && dataInsert.pin && dataInsert.name"
                        color="green"
                        @click="addBtn()"
                        dark
                      >Create Button</v-btn>

                      <v-btn flat @click="e1 = 1">Cancel</v-btn>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="dialog = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card class></v-card>
        </v-flex>
        <v-flex xs12>
          <v-card class="pa-2 mt-2">
            <h1 class="subheading">Components</h1>
            <hr />
            <h2 v-if="buttons.length == 0" class="pa-2">No Buttons yet</h2>
            <v-card v-for="button in buttons" :key="button.name">
              <v-card-title primary-title>
                <div class="pa-1">
                  <h3 class="mb-0">{{button.name}}</h3>
                  <div v-if="button.status">active</div>
                  <div v-if="!button.status">inactive</div>
                  <v-btn
                    block
                    :class="{'green': button.status, 'red': !button.status}"
                    dark
                    @click="button.status ? button.status = false : button.status = true  ,powerSwitch(button.auth,button.pin, button.status ? 1 : 0)"
                  >
                    <v-icon v-if="button.status">power</v-icon>
                    <v-icon v-else-if="!button.status">power_off</v-icon>
                  </v-btn>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn flat color="orange">Timer</v-btn>
                <v-btn flat color="orange">Level</v-btn>
              </v-card-actions>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
export default {
  name: "Panel",
  data() {
    return {
      dialog: false,
      e1: 0,
      dataInsert: {
        name: "",
        auth: "",
        pin: "",
        statis: false
      },
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 40 || "letters must be less than 40 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      // buttons: [
      //   {
      //     name: "Balcony",
      //     auth: "e8097c404a814f2b842fa925b2a52f8f",
      //     pin: "D11",
      //     status: false
      //   },
      //   {
      //     name: "Sala",
      //     auth: "e8097c404a814f2b842fa925b2a52f8f",
      //     pin: "D12",
      //     status: true
      //   },
      //   {
      //     name: "Bedroom",
      //     auth: "e8097c404a814f2b842fa925b2a52f8f",
      //     pin: "D13",
      //     status: false
      //   }
      // ],
      buttons: []
    };
  },
  methods: {
    powerSwitch(auth, pin, value) {
      var request = new XMLHttpRequest();

      request.open(
        "GET",
        `http://blynk-cloud.com/${auth}/update/${pin}?value=${value}`
      );

      request.onreadystatechange = function() {
        if (this.readyState === 4) {
          console.log("Status:", this.status);
          console.log("Headers:", this.getAllResponseHeaders());
          console.log("Body:", this.responseText);
          console.log(auth, pin, value)
        }
      };

      request.send();
    },
    addBtn() {
      db.collection("power")
        .add({
          name: this.dataInsert.name,
          auth: this.dataInsert.auth,
          pin: this.dataInsert.pin,
          status: false
        })
        .then(() => {
          //this will forward to the selected page
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  },
  watch: {
    buttons: {
      handler(val) {},
      deep: true
    }
  },
  computed: {
    update: function() {
      db.collection("power")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let button = doc.data();
            button.id = doc.id;
            this.buttons.push(button);
            console.log(this.buttons);
          });
        });
    }
  },
  created() {
    //fetch data from the firestore
    db.collection("power")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let button = doc.data();
          button.id = doc.id;
          this.buttons.push(button);
          console.log(this.buttons);
        });
      });
  }
};
</script>

<style>
</style>
