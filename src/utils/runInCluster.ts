import * as os from 'os';
import * as _cluster from 'cluster'
const cluster = _cluster as unknown as _cluster.Cluster;
export function runInCluster(
	bootstrap: () => Promise<void>
) {
	const numberOfCores = os.cpus().length;

	if (cluster.isMaster) {
		for (let i = 0; i < numberOfCores; i++) {
			cluster.fork();
		}
	} else {
		bootstrap();
	}
}