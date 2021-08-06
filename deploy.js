const Deployer = require('ssh-deploy-release');
 
const options = {
    localPath: 'dist/rpi',
	//host: '127.0.0.1',
	//port: '2222',
	host: '11.230.0.2',
    username: 'pi',
	privateKeyFile: '/home/mirage/.ssh/id_rsa',
//    password: 'password',
    deployPath: '/home/scripts/nginx/www/',
	releasesFolder: 'app-versions',
	currentReleaseLink: 'home',
	onBeforeLink: context => `chmod -R u=rwX,g=rX,o=rX ${context.release.path}/*`
};
 
const deployer = new Deployer(options);
deployer.deployRelease(() => {
    console.log('Ok !')
});
