class MetadataRegistry {
  currentCartridge;

  currentCaller;

  data = {};

  collect(action, metadata) {
    if (!this.data[this.currentCaller]) {
      this.data[this.currentCaller] = {};
    }

    this.data[this.currentCaller][action] = {
      ...metadata,
      cartridge: this.currentCartridge,
    };
  }

  collectIfMissing(action, metadata) {
    if (
      !this.data[this.currentCaller] ||
      !this.data[this.currentCaller][action]
    ) {
      this.collect(action, metadata);
    }
  }

  getCallerMetadata(callerName) {
    return this.data[callerName] || {};
  }
}

module.exports = new MetadataRegistry();
