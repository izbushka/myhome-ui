const Deployer = require('ssh-deploy-release');
 
const options = {
    localPath: 'dist/angular',
    host: '11.230.0.2',
    username: 'pi',
	privateKeyFile: '/home/mirage/.ssh/id_rsa',
//    password: 'password',
    deployPath: '/home/scripts/nginx/www/',
	currentReleaseLink: 'app',
	onBeforeLink: context => `chmod -R u=rwX,g=rX,o=rX ${context.release.path}/*`
};
 
const deployer = new Deployer(options);
deployer.deployRelease(() => {
    console.log('Ok !')
});
