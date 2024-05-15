import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: 'http://localhost:8081/',
    realm: 'Element3',
    clientId: 'e3-challenge-client',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;