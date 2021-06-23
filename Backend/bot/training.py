import tensorflow as tf
import tflearn
from . preprocessing import create_vocab_and_data_clean, bag_of_words
import numpy
import random
import os

words, labels, trainings, outputs, data = create_vocab_and_data_clean()

model_file = os.path.join(os.path.dirname(os.path.dirname(__file__)),'model.tflearn')

def train():

    tf.compat.v1.reset_default_graph()
    net = tflearn.input_data(shape=[None, len(trainings[0])])
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, len(outputs[0]), activation="softmax")
    net = tflearn.regression(net)

    model = tflearn.DNN(net)

    try:
        model.load(model_file)
    except:
        model.fit(trainings, outputs, n_epoch=1000, batch_size=8, show_metric=True)
        model.save("model.tflearn")

    return model

def predict(message):
    
    message = message.lower()
    model = train()
    results = model.predict([bag_of_words(message, words)])[0]
    results_index = numpy.argmax(results)
    tag = labels[results_index]
    if tag == 'crime':
        return None
    if (results[results_index] > 0.8):
        for tg in data["intents"]:
            if tg['tag'] == tag:
                responses = tg['responses']

        return random.choice(responses)
    else:
        return None
        # return "I'm not sure about that. Try again."

