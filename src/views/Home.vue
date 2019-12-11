<template>
    <div class="home">
        <v-container>
            <v-row>
                <v-col cols="12" md="6" class="text-center">
                    <h1>Cambio de dolar a pesos</h1>
                </v-col>
            </v-row>
    
    
            <v-row>
                <v-col>
                    <v-card>
                        <v-date-picker color="#385F73" v-model="fechaSeleccionada" full-width :min="minimo" :max="maximo" @change="getDolar(convertirDate(fechaSeleccionada))"></v-date-picker>
                    </v-card>
                    <v-card color="#385F73" dark>
                        <v-card-text class="display-1 text-center">{{valorDelDolar}}</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <!--
                                                                <v-card :color="item.color" dark>
                                                                    <div class="d-flex flex-no-wrap justify-space-between">
                                                                        <div>
                                                                            <v-card-title class="headline" v-text="Supermodel"></v-card-title>
                                                    
                                                                            <v-card-subtitle v-text="Supermodel"></v-card-subtitle>
                                                                        </div>
                                                    
                                                                        <v-avatar class="ma-3" size="125" tile>
                                                                            <v-img :src="item.src"> </v-img>
                                                                        </v-avatar>
                                                                    </div>
                                                                </v-card>
                                                            </v-row>
                                                    -->
            <v-row>
                <v-col align="center" justify="center">
                    <img class="text-center" alt="Vue logo" src="../assets/logo.png">
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    // Axios Configuracion //
    import axios from 'axios'
    import {mapMutations} from 'vuex'

    export default {
        name: 'home',
        components: {},
        data() {
            return {
                Supermodel: 'Super Model',
                item: {
                    src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
                    color: '#1F7087'
                },
                fechaSeleccionada: new Date().toISOString().substr(0, 10),
                maximo: new Date().toISOString().substr(0, 10),
                minimo: '1984',
                valorDelDolar: null
            }
        },
        methods: {
            ...mapMutations(['mostrarDialogo', 'ocultarDialogo']),
            async getDolar(dia) {
                try {
                    this.mostrarDialogo({titulo: 'Cargando datos', color: 'primary'})
                    let datos = await axios.get(`https://mindicador.cl/api/dolar/${dia}`)
                    if (datos.data.serie.length > 0) {
                        this.valorDelDolar = await datos.data.serie[0].valor
                    } else {
                        this.valorDelDolar = 'Sin resultados'
                    }
                } catch(error) {
                    console.log(error)
                }finally{
                    this.ocultarDialogo()
                }
            },
            convertirDate(dateString) {
                let p = dateString.split(/\D/g)
                return [p[2], p[1], p[0]].join("-")
            }
        },
        created() {
            this.getDolar('10-12-2019');
        },
    }
    /*
    https://mindicador.cl/api/dolar${dia}
    {
        version: "1.6.0",
        autor: "mindicador.cl",
        codigo: "dolar",
        nombre: "Dólar observado",
        unidad_medida: "Pesos",
        serie: [
            {fecha: "2019-12-10T03:00:00.000Z", valor: 771.29}
        ],
    }
        */
</script>
