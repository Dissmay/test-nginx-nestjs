import { Job, DoneCallback } from 'bull';

async function imageProcessor(job: Job, doneCallback: DoneCallback) {
	console.log(';111111111', job);

	doneCallback(null, 1);
}

export default imageProcessor;